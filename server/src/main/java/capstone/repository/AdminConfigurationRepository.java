package capstone.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import capstone.model.AdminConfiguration;

public interface AdminConfigurationRepository extends JpaRepository<AdminConfiguration, Long> {

	AdminConfiguration findById(Long id);

}
