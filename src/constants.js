// Education Section Logo's
import schoolLogo from './assets/education_logo/school.png';
import clgLogo from './assets/education_logo/integral.png';

// Project Section Logo's
import landing from './assets/work_logo/landing_page.png';
import game from './assets/work_logo/Tic Tac toe.png';
import background_removal from './assets/work_logo/removal.png';
import port from './assets/work_logo/myport.png';


export const education = [
	{
		id: 0,
		img: schoolLogo,
		school: "ST. Teresa's Day School, Lucknow",
		date: 'June 2019 - July 2023',
		grade: '84.5%',
		desc: "I have completed my class 12 from ST. Teresa's Day School, Lucknow.",
		degree: 'High School',
	},
	{
		id: 1,
		img: clgLogo,
		school: 'Integral University, Lucknow',
		date: 'Aug 2023 - present',
		grade: '8.5 CGPA',
		desc: "I am currently pursuing my Bachelor's degree in Computer Science from Integral University, Lucknow. My coursework includes a mix of theoretical foundations and practical applications, preparing me for a career in software development.",
		degree: 'Bachelor of Technology in Computer Science',
	},
];

export const projects = [
	{
		id: 0,
		title: 'Taskflow',
		description:
			'TaskFlow is a modern task management application that helps users organize, prioritize, and track their daily tasks efficiently. It features an intuitive interface for creating, updating, deleting, and managing tasks, providing a seamless and responsive user experience across all devices.',
		image: game,
		tags: [
			'React JS',
			'Tailwind CSS',
			'Node JS',
			'Express JS',
			'MongoDB',
		],
		github: 'https://github.com/student-integralcollege/taskflow',
		webapp: 'https://taskflow-ayxo.vercel.app/login',
	},
	{
		id: 1,
		title: 'Landing Page',
		description:
			'A responsive headphone landing page built with React and Tailwind CSS.',
		image: landing,
		tags: ['React JS', 'Tailwind CSS'],
		github: 'https://github.com/student-integralcollege/landing-page',
		webapp: 'https://headphone12-website.netlify.app',
	},
	{
		id: 2,
		title: 'Bg removal',
		description:
			'A React-based web application that provides background removal services for images. Users can upload their images and get a clean, transparent background in seconds. The app uses advanced AI algorithms to ensure high-quality results.',
		image: background_removal,
		tags: [
			'React JS',
			'Tailwind CSS',
			'Clerk.js',
			'Node JS',
			'Express JS',
			'MongoDB',
			'Razorpay'
		],
		github: 'https://github.com/student-integralcollege/removal',
		webapp: 'https://removal-x7ta.vercel.app',
	},
	{
		id: 3,
		title: 'AI Expense Tracker',
		description: 'AI Expense Tracker is a smart personal finance application that helps users track income and expenses with AI-powered insights. It provides real-time expense categorization, financial summaries, and interactive analytics through a clean, responsive interface, enabling users to manage their finances more effectively.',
		image: port,
		tags: [
			'React JS',
			'Tailwind CSS',
			'Node JS',
			'Express JS',
			'MongoDB',
			'Open AI API',
		],
		github: 'https://github.com/student-integralcollege/Expense-tracker',
		webapp: 'https://portfolio-work-31.vercel.app/',
	},
];

export const skills = [
	'React.js', 'Typescript', 'MongoDB', 'Node.js', 'Express.js', 'Tailwind CSS', 'Next.js', 'JavaScript',
	'Postman', 'GitHub', 'Docker', 'PostgreSQL', 'REST APIs', 'WebSockets',
];