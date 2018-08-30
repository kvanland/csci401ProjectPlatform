package capstone.repository;

import javax.transaction.Transactional;

import capstone.model.Project;
import capstone.model.users.Stakeholder;

@Transactional
public interface StakeholderRepository extends UserBaseRepository<Stakeholder> {
}

