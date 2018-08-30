package capstone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import capstone.model.AdminConfiguration;
import capstone.repository.AdminConfigurationRepository;

@RestController
@RequestMapping("/admin/configurations")
public class AdminConfigurationController {
	
	@Autowired
	private AdminConfigurationRepository acRepository;
	
	@PostMapping("/save")
	@CrossOrigin(origins = "http://localhost:3000")
	public AdminConfiguration saveConfigurations(@RequestBody AdminConfiguration adminConfig) {
		acRepository.deleteAll();
		System.out.println("Date one: " + adminConfig.deliverableOneDate.toString());
		System.out.println("Number of ranked projects: " + adminConfig.numRankedProjects);
		return acRepository.save(adminConfig);
	}
	
	@GetMapping("/current")
	@CrossOrigin(origins = "http://localhost:3000")
	public AdminConfiguration getConfiguration() {
		Long currentId = (long) 1;
		return acRepository.findOne(currentId);
	}
}
