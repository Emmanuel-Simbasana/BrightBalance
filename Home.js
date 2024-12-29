// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <header>
                <h1>Welcome to <span class="wave-text">BrightBalance!</span></h1>
<h2>Transform the way you manage your money and take control of your financial future with BrightBalance. Our intuitive platform is designed to help you effortlessly track your expenses and monitor your spending habits, all in one convenient place.</h2>

<h2>Why Choose BrightBalance?</h2>
<h3>
    <ul>
        <li>User-Friendly Interface: Our easy-to-navigate design ensures you can start managing your finances without any hassle.</li>

<li>Real-Time Tracking: Stay updated with your spending in real-time and make informed decisions on the go.</li>

<li>Customizable Categories: Organize your expenses into categories that fit your lifestyle and financial goals.</li>

<li>Insightful Reports: Gain valuable insights into your spending habits with detailed reports and analytics.</li>

<li>Secure and Private: Your data's security is our top priority. BrightBalance uses advanced encryption to keep your information safe.</li>
</ul></h3>
<h2>Get Started Today!</h2>

<h1>Frequently Asked Questions</h1>

<button class="accordion">What is BrightBalance and how does it work?</button>
<div class="panel">
    <p>BrightBalance is an intuitive platform designed to help users track their expenses and monitor their spending habits. By categorizing expenses, providing real-time updates, and generating insightful reports, BrightBalance enables users to manage their finances efficiently.</p>
</div>

<button class="accordion">Who is behind BrightBalance?</button>
<div class="panel">
    <p>A founder of BrightBalance is Emmanuel Simbasana, a student, CEO, and visionary leader passionate about financial management and technology. Emmanuel's unique blend of academic insight and entrepreneurial spirit has driven the creation of this innovative expense tracking tool.</p>
</div>

<button class="accordion">What inspired the creation of BrightBalance?</button>
<div class="panel">
    <p>The inspiration behind BrightBalance stemmed from Emmanuel Simbasana's personal experience as a student managing finances. Recognizing the challenges people face in tracking expenses and maintaining financial discipline, he envisioned a solution that is both intuitive and effective.</p>
</div>

<button class="accordion">What sets BrightBalance apart from other expense trackers?</button>
<div class="panel">
    <p>BrightBalance stands out due to its user-friendly interface, real-time tracking capabilities, and customizable features that cater to individual financial needs. Unlike other trackers, BrightBalance offers detailed insights and personalized tips to help users improve their financial habits.</p>
</div>

<button class="accordion">How do I sign up for BrightBalance?</button>
<div class="panel">
    <p>You can sign up by visiting our website and clicking on the "Sign Up" button. Follow the prompts to create your account using your email address and a secure password.</p>
</div>

<button class="accordion">How secure is my data on BrightBalance?</button>
<div class="panel">
    <p>Your data security is our top priority. BrightBalance uses advanced encryption protocols to ensure your information is protected. We also comply with global data protection regulations to safeguard your privacy.</p>
</div>

<button class="accordion">Can I track my expenses in real-time?</button>
<div class="panel">
    <p>Yes, BrightBalance provides real-time tracking of your expenses. You can log your transactions instantly and monitor your spending as it happens.</p>
</div>

<button class="accordion">How do I categorize my expenses?</button>
<div class="panel">
    <p>BrightBalance allows you to create customizable categories for your expenses. You can assign each transaction to a category, making it easier to analyze your spending patterns.</p>
</div>

<button class="accordion">Can I generate reports on my spending habits?</button>
<div class="panel">
    <p>Absolutely. BrightBalance offers detailed reports that give you insights into your spending habits. You can generate weekly, monthly, or custom reports to understand your financial behavior better.</p>
</div>

<button class="accordion">How do I reset my password if I forget it?</button>
<div class="panel">
    <p>If you forget your password, click on the "Forgot Password" link on the login page. Follow the instructions to reset your password via your registered email.</p>
</div>

<button class="accordion">Can I set financial goals with BrightBalance?</button>
<div class="panel">
    <p>Yes, BrightBalance allows you to set and track financial goals. You can monitor your progress and make adjustments to achieve your objectives more effectively.</p>
</div>

<button class="accordion">Is there a limit to the number of transactions I can log?</button>
<div class="panel">
    <p>There is no limit to the number of transactions you can log on BrightBalance. Both free and premium plans offer unlimited transaction logging.</p>
</div>


<button class="accordion">Can I share my BrightBalance account with family members?</button>
<div class="panel">
    <p>Yes, BrightBalance allows account sharing with family members. You can invite them to join your account and collaborate on managing household finances.</p>
</div>

<button class="accordion">What happens to my data if I delete my account?</button>
<div class="panel">
    <p>If you choose to delete your account, all your data will be permanently erased from our servers. We recommend exporting any important information before deleting your account.</p>
</div>

<button class="accordion">How do I export my financial data from BrightBalance?</button>
<div class="panel">
    <p>You can export your data by navigating to the reports section and selecting the export option. You can choose to export your data in various formats like CSV or PDF.</p>
</div>

<button class="accordion">What are the main benefits of using BrightBalance?</button>
<div class="panel">
    <p>The main benefits of using BrightBalance include ease of use, real-time expense tracking, insightful financial reports, secure data handling, and the ability to set and achieve financial goals. BrightBalance empowers users to take control of their financial future.</p>
</div>

<button class="accordion">Can BrightBalance help with budgeting and saving money?</button>
<div class="panel">
    <p>Yes, BrightBalance offers robust budgeting tools that allow users to set spending limits for various categories. The platform provides alerts and insights to help users stay within their budget and identify opportunities to save money.</p>
</div>

<button class="accordion">How does Emmanuel Simbasana's background influence BrightBalance?</button>
<div class="panel">
    <p>Emmanuel Simbasana's experience as a student and entrepreneur has heavily influenced BrightBalance's development. His understanding of financial challenges and commitment to creating innovative solutions drives the platform's continuous evolution and user-centric design.</p>
</div>

<button class="accordion">What future plans does Emmanuel Simbasana have for BrightBalance?</button>
<div class="panel">
    <p>Emmanuel Simbasana envisions expanding BrightBalance to include features like investment tracking, advanced financial planning tools, and integration with a wider range of financial services. The goal is to continuously evolve and meet the diverse needs of our users.</p>
</div>

                <nav>
                    <ul className="nav-links">
                        <li><Link to="/signin">Login</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li>
                            <button className="hamburger" onClick={() => {/* Toggle dropdown */}}>
                                ☰
                            </button>
                            {/* Dropdown menu can be added here */}
                        </li>
                    </ul>
                </nav>
            </header>
            <section>
                <h2>Tips for Budgeting and Saving</h2>
                <ul>
                    <li><b>Track Your Spending:</b> Start by recording all your expenses to understand where your money is going. Use a tool like BrightBalance to make this process easier.</li>
                    <li><b>Create a Budget:</b> Set up a monthly budget that outlines your income and expenses. Allocate funds for necessities, savings, and discretionary spending.</li>
                    <li><b>Set Financial Goals:</b> Define clear, achievable financial goals, whether it's saving for a vacation, an emergency fund, or paying off debt.</li>
                    <li><b>Prioritize Saving:</b> Treat saving as a non-negotiable expense. Aim to save at least 20% of your income, if possible.</li>
                    <li><b>Cut Unnecessary Expenses:</b> Review your spending habits and identify areas where you can cut back, such as dining out, subscriptions, or impulse purchases.</li>
                    <li><b>Monitor Your Progress:</b> Regularly review your budget and savings goals to ensure you're on track. Adjust as needed to stay aligned with your financial objectives.</li>
                    <li><b>Avoid Debt:</b> Be cautious with credit card use and loans. If you do use credit, try to pay off the balance in full each month to avoid interest charges.</li>
                    <li><b>Build an Emergency Fund:</b> Save at least three to six months' worth of living expenses in an easily accessible account to cover unexpected costs.</li>
                    <li><b>Educate Yourself:</b> Continuously learn about personal finance and money management to make informed decisions and improve your financial literacy.</li>
                </ul>
                
            </section>
            <div class="footer">
      &copy; 2025 BrightBalance. Powered by <b>EMMANUEL H. SIMBASANA!!.</b>
    </div>
        </div>
    );
};

export default Home;