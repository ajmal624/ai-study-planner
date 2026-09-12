#ai-study-planner

Unzip the File
use internet for all installation

Install Python 3.14, then verify the installation:
    Press Windows + R, type `cmd`, and press Enter.
    In Command Prompt, run:
        python --version

Install Node.Js, then verify the installation:
    Press Windows + R, type `cmd`, and press Enter.
    In Command Prompt, run:
        Node -v
		npm -v

Open Visual Studio Code and install the required Python, Node extensions.

Go to File → New Window → Open Folder, then select the `ai-study-planner` folder.

Open the terminal and run:
	cd backend
    py -m venv .venv
    venv\Scripts\Activate
    pip install -r requirements.txt
	python manage.py runserver
	Then create a '+' icon to create new terminal then type:
	cd frontend
	npm install
	npm run dev

In the ouput page, select Create account:
    Username: ajmal
    Email: ajmal@example.com
    Password: ajmal12345

Click Courses:
    Add course 1:
        Course name: Mathematics
        Course code: MATH101
        Total topics: 12
        Color: Blue
    Add course 2:
        Course name: Computer Science
        Course code: CS102
        Total topics: 10
        Color: Purple
    Add course 3:
        Course name: Physics
        Course code: PHY103
        Total topics: 8
        Color: Green

Click Exams:
    Course: Mathematics
    Exam title: Mathematics Midterm Exam
    Exam date: 2026-09-25
    Priority: Priority 5 — High
    Target score: 85

    Course: Computer Science
    Exam title: Programming Fundamentals Exam
    Exam date: 2026-09-30
    Priority: Priority 4
    Target score: 80
    Course: Physics

    Exam title: Physics Unit Test
    Exam date: 2026-10-05
    Priority: Priority 3 — Normal
    Target score: 75

Click Availability:
    Monday: 2 hours
    Tuesday: 2 hours
    Wednesday: 3 hours
    Thursday: 2 hours
    Friday: 2 hours
    Saturday: 4 hours
    Sunday: 3 hours

Click AI Revision Plan:
    Plan duration: 14 days

Click Generate revision plan. It will automatically create tasks such as:
    Learn core topics: Mathematics
    Revision practice: Computer Science
    Final revision: Mathematics Midterm Exam

Then Click the Dashboard and Calender to view the results