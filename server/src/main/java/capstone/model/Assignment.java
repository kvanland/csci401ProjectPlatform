package capstone.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public abstract class Assignment {
	@Id
	@GeneratedValue
	Long id;
	
	LocalDateTime dueDate;
	LocalDateTime submitDateTime;
}
