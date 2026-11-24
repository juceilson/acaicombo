package br.com.acaicombo.config;

import br.com.acaicombo.model.Role;
import br.com.acaicombo.model.User;
import br.com.acaicombo.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AdminSeeder {
    @Value("${app.default-admin.username}")
    private String adminUserName;
    @Value("${app.default-admin.password}")
    private String adminPassword;

    @Bean
    public CommandLineRunner initAdmin(UserRepository userRepo) {
        return args -> {
            boolean adminExists = userRepo.existsByRole(Role.ADMIN);

            if (!adminExists) {
                String hash = BCrypt.hashpw(adminPassword, BCrypt.gensalt(12));

                User admin = new User();
                admin.setUsername(adminUserName);
                admin.setPassword(hash);
                admin.setRole(Role.ADMIN);

                userRepo.save(admin);

                System.out.println("Admin padrão criado com sucesso!");
            }
        };
    }
}

