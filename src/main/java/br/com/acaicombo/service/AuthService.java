package br.com.acaicombo.service;

import br.com.acaicombo.model.Role;
import br.com.acaicombo.model.User;
import br.com.acaicombo.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepo;

    public User login(String username, String password) {
        return userRepo.findByUsername(username)
                .filter(user -> BCrypt.checkpw(password, user.getPassword()))
                .orElse(null);
    }

    public void register(String username, String password, Role role) {
        String hash = BCrypt.hashpw(password, BCrypt.gensalt(12));
        User user = new User();
        user.setUsername(username);
        user.setPassword(hash);
        user.setRole(role);
        userRepo.save(user);
    }

}
