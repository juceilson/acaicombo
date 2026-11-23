package br.com.acaicombo.controller;

import br.com.acaicombo.model.Acai;
import br.com.acaicombo.repository.AcaiRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/acais")
public class AcaiController {

    @Autowired
    private AcaiRepository acaiRepo;

    @GetMapping("/list")
    public List<Acai> list(HttpSession session) {
        return acaiRepo.findAll();
    }

    @PostMapping("/add")
    public void add(@RequestBody Acai acai) {
        acaiRepo.save(acai);
    }

    @PutMapping("/update/{id}")
    public void update(@PathVariable Long id, @RequestBody Acai acai) { acaiRepo.save(acai); }

    @GetMapping("{id}")
    public Acai findById(@PathVariable Long id) { return acaiRepo.findById(id).get(); }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) { acaiRepo.deleteById(id); }
}
