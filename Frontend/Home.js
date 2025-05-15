import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <style>
        {`
          body {
            font-family: 'Times New Roman', Times, serif;
            background-color:#130178;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .home-container {
            width: 100%;
            max-width: 1500px;
            margin: 50px auto;
            padding: 20px;
            justify-content: center;
            align-items: center;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          h1 {
            font-size: 32px;
            color: #333;
            text-align: center;
          }

          section {
            margin: 20px 0;
          }

          h2 {
            font-size: 24px;
            color: #444;
            margin-bottom: 10px;
          }

          ul {
            list-style-type: disc;
            margin-left: 20px;
          }

          ul li {
            font-size: 18px;
            color: #555;
          }

          .notifications p {
            font-size: 16px;
            color: #888;
          }

          .login-link {
            display: inline-block;
            margin-top: 30px;
            padding: 12px 24px;
            background-color:rgb(13, 121, 237);
            color: white;
            display: inline-block;         
            margin: 30px auto 0 auto;
            text-align: center;
            font-size: 18px;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
          }
            .button-wrapper {
              text-align: center;
              margin-top: 30px;
            }

          .login-link:hover {
            background-color:rgb(4, 31, 128);
          }
        `}
      </style>

      <div className="home-container">
        <h1>GRA COLLEGE & TECHNOLOGY</h1>

        <section className="features">
          <h2 className='button-wrapper'>Features</h2>
          <ul>
            <li>Student Details</li>
            <li>Course Details</li>
            <li>Fees Details</li>
          </ul>
        </section>

        <section className="notifications">
          <h2 className='button-wrapper'>Latest Announcements</h2>
          <p>No new announcements at the moment.</p>
        </section>
        <div className='button-wrapper'>
        <Link to="/login" className="login-link" >Go to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
