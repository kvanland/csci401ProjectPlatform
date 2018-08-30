package capstone.repository;

import javax.transaction.Transactional;

import capstone.model.users.Admin;

@Transactional
public interface AdminRepository extends UserBaseRepository<Admin> { /* ... */ }
