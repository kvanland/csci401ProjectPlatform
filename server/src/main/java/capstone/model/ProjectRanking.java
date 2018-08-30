package capstone.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class ProjectRanking {
	@Id
	@GeneratedValue
	private Long id;
	private Long studentId;
	private Long projectId;
	private Integer rank;
}
