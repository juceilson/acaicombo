package br.com.acaicombo.filter;

import br.com.acaicombo.model.User;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

@WebFilter("/*")
public class AuthFilter implements Filter {
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse resp = (HttpServletResponse) response;
        String uri = req.getRequestURI();

        // para liberar login e seus arquivos estáticos
        if (uri.endsWith("login")
                || uri.endsWith("login.html")
                || uri.startsWith(req.getContextPath() + "/js/login.js")
                || uri.startsWith(req.getContextPath() + "/css/login.css")) {
            chain.doFilter(request, response);
            return;
        }

        HttpSession session = req.getSession(false);
        User usuario = (session != null) ? (User) session.getAttribute("user") :
                null;

        if (usuario == null) {
            resp.sendRedirect("/login.html");
            return;
        }

        String role = usuario.getRole().name();

        if ("USER".equals(role)) {
            if (uri.contains("listarAcais") || uri.contains("bolos/list") || uri.contains("auth/me") || uri.contains("logout")) {
                chain.doFilter(request, response);
            } else {
                resp.sendRedirect("listarAcais.html");
            }

        } else if ("ADMIN".equals(role)) {
            chain.doFilter(request, response);

        } else {
            resp.sendRedirect("/login.html");
        }
    }
}


