package capstone.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

/*@Embeddable
class TaskId implements Serializable {
	private static final long serialVersionUID = 1L;
	String name;
	long reportId;
}*/

@Entity
public class Task {
	//@EmbeddedId TaskId id;
	@Id
	@GeneratedValue
	long id;
	
	@MapsId("report_id")
	@ManyToOne(fetch = FetchType.LAZY)
	WeeklyReport report;
	
	private Integer numHours;
	private String description;
}
