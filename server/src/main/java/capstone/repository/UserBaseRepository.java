package capstone.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import capstone.model.users.User;

@NoRepositoryBean
public interface UserBaseRepository<T extends User> extends JpaRepository<T, Long> {
	public T findByAddr(String addr);
	public T findByEmail(String email);
	public T findByUserId(Long userId);
}
