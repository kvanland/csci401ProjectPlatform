1. Projects and Rankings are imported through two text files: projects.txt and rankings.txt.
The format for each row in projects.txt is: ProjectName MinSize Max Size
The format for each row in rankings.txt is: StudentName FirstProjectId SecondProjectId ThirdProjectId [etc...]

2. Each Project is evaluated based on a Popularity metric, which takes into account how 
many students are interested in it and how highly. Projects are then sorted by Popularity in descending order.

3. Initial Assignment: We iterate through each Student in random order, and assign them their 
best choice possible while not exceeding any Project's maximum group size.

4. Project Elimination: Unpopular groups are eliminated, so long as doing so does not reduce 
the # of spots left below the # of students still needing assignment.

5. Bumping: Students initially assigned to groups that were just eliminated are reassigned now.
These students are given their top choices if space permits. If not, they are temporarily assigned to their first choice.
This displaces another student, who goes through the same bumping algorithm. This happens 3 times until a satisfactory assignment
is found. If not, this attempt is reverted and the originally unassigned student goes back to being unassigned.

6. This entire algorithm is run 30 times, and the iteration with the highest overall satisfaction score is displayed to the admin.
