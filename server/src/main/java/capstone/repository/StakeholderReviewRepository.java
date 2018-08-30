package capstone.repository;

import javax.transaction.Transactional;

import capstone.model.StakeholderReview;

@Transactional
public interface StakeholderReviewRepository extends AssignmentBaseRepository<StakeholderReview> {

}
