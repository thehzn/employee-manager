
import { useSelector } from 'react-redux';


export default function Home() {
  const user = useSelector((state)=>state.auth.user);
  
const formatDate = () => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
  };

 

  return (
    <>
      <style>{`
        .home-section {
          min-height: 100vh;
          background: #0a0a14;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .home-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          color: #fff;
           margin-bottom:20px;
          font-size: clamp(2rem, 5vw, 3.5rem);
        }
        .home-title span {
          background: linear-gradient(135deg, #7c6af7, #f76a8c);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .home-sub { color: rgba(255,255,255,0.45); font-size: 1rem; margin-bottom:20px;}
        .search-input {
          background: rgba(255,255,255,0.07) !important;
          border: 1px solid rgba(255,255,255,0.12) !important;
          border-right: none !important;
          color: #fff !important;
          border-radius: 10px 0 0 10px !important;
          padding: 0.75rem 1.2rem !important;
        }
        .search-input::placeholder { color: rgba(255,255,255,0.3) !important; }
        .search-input:focus { 
          border-color: rgba(124,106,247,0.5) !important; 
          box-shadow: none !important;
          background: rgba(255,255,255,0.09) !important;
        }
        .search-btn {
          background: linear-gradient(135deg, #7c6af7, #9b8df9) !important;
          border: none !important;
          border-radius: 0 10px 10px 0 !important;
          padding: 0.75rem 1.4rem !important;
          font-weight: 500 !important;
        }
        .browse-link {
          color: rgba(255,255,255,0.4);
          font-size: 0.88rem;
          text-decoration: none;
          transition: color 0.2s;
        }
        .browse-link:hover { color: #7c6af7; }
      `}</style>

      <section className="home-section">
        <div className="container text-center">
          <h1 className="home-title mb-3">
            Welcome, {user?.name||'Admin'}
          </h1>
          <p className="home-sub mb-3">
            {formatDate()} </p>


        </div>
      </section>
    </>
  );
}