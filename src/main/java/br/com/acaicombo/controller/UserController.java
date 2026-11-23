package br.com.acaicombo.controller;

import br.com.acaicombo.model.User;
import br.com.acaicombo.repository.UserRepository;
import br.com.acaicombo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private AuthService auth;

    @GetMapping("/list")
    public List<User> list() {
        return userRepo.findAll();
    }

    @PostMapping("/add")
    public void add(@RequestBody User user) {
        auth.register(
                user.getUsername(),
                user.getPassword(),
                user.getRole()
        );
    }

    @DeleteMapping("/delete/{username}")
    public void delete(@PathVariable String username) { userRepo.deleteById(username); }
}
