package capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import capstone.model.Deliverable;

@RepositoryRestResource
@Transactional
public interface DeliverableRepository extends JpaRepository<Deliverable, Long> {//AssignmentBaseRepository<Deliverable> {

	Iterable<Deliverable> findAllByProjectId(Long projectId);
	
	@Modifying(clearAutomatically = true)
	@Query("UPDATE Deliverable d SET d.status = :status WHERE d.id = :id")
	@Transactional
	void setStatusForId(@Param("status") String status, @Param("id") Long id);
}
