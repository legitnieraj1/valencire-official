import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Head>
        <title>About VALENCIRÉ®</title>
      </Head>

      <style dangerouslySetInnerHTML={{
        __html: `
        /* ================= RESET (Local to this page structure visually) ================= */
        .about-page-body {
            background: #000;
            color: #fff;
            min-height: 100vh;
        }

        /* ================= HEADER ================= */
        .about-header {
            position: fixed;
            top: 0;
            width: 100%;
            height: 90px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #000;
            z-index: 1000;
        }

        .about-header-left {
            position: absolute;
            left: 40px;
            font-size: 13px;
            letter-spacing: 1px;
            opacity: .85;
            cursor: pointer;
        }

        .about-header-right {
            position: absolute;
            right: 40px;
            display: flex;
            align-items: center;
            gap: 26px;
        }

        .about-header-right span {
            font-size: 13px;
            letter-spacing: 1.5px;
            cursor: pointer;
            opacity: .85;
        }

        .about-header-right span:hover,
        .about-header-left:hover {
            opacity: 1;
        }

        /* LOGO IMAGE */
        .about-logo img {
            height: 190px;
            object-fit: contain;
            pointer-events: none;
        }

        /* ================= MAIN ================= */
        .about-main {
            padding-top: 180px;
            padding-bottom: 160px;
        }

        /* ================= ABOUT SECTION ================= */
        .about-section {
            max-width: 820px;
            margin: 0 auto;
            text-align: center;
            padding: 0 20px;
        }

        .about-section h1 {
            font-size: 34px;
            letter-spacing: 3px;
            font-weight: 400;
            margin-bottom: 50px;
        }

        .about-section p {
            font-size: 16px;
            line-height: 1.8;
            opacity: .75;
            margin-bottom: 26px;
        }

        /* ================= SPACER ================= */
        .about-spacer {
            height: 140px;
        }

        /* ================= HELP SECTION ================= */
        .about-help {
            max-width: 820px;
            margin: 0 auto;
            text-align: center;
            padding: 0 20px;
        }

        .about-help h2 {
            font-size: 14px;
            letter-spacing: 3px;
            font-weight: 400;
            opacity: .9;
            margin-bottom: 24px;
        }

        .about-help p {
            font-size: 28px;
            line-height: 1.5;
            font-weight: 300;
            margin-bottom: 40px;
        }

        .about-help a {
            font-size: 13px;
            letter-spacing: 1.5px;
            color: #fff;
            text-decoration: none;
            border-bottom: 1px solid rgba(255, 255, 255, .4);
            padding-bottom: 4px;
        }

        .about-help a:hover {
            border-bottom-color: #fff;
        }

        /* ================= FOOTER ================= */
        .about-footer {
            padding: 80px 20px 60px;
            text-align: center;
            font-size: 12px;
            letter-spacing: 2px;
            opacity: .6;
            border-top: 1px solid rgba(255, 255, 255, .1);
        }

        /* ================= RESPONSIVE ================= */
        @media(max-width:600px) {
            .about-logo img {
                height: 150px;
            }

            .about-section h1 {
                font-size: 28px;
            }

            .about-help p {
                font-size: 22px;
            }
        }
        `
      }} />

      <div className="about-page-body">
        {/* ================= HEADER ================= */}
        <header className="about-header">
            <div className="about-header-left">+ Contact Us</div>

            <div className="about-logo">
                <Link href="/">
                    <img src="/LOGO BRO.png" alt="VALENCIRÉ Logo" style={{ cursor: 'pointer', pointerEvents: 'auto' }} />
                </Link>
            </div>

            <div className="about-header-right">
                <span onClick={() => window.location.href='/account'}>Account</span>
                <span>Search</span>
                <span onClick={() => document.getElementById('menuPanel')?.classList.add('active')}>Menu</span>
            </div>
        </header>

        {/* ================= MAIN ================= */}
        <main className="about-main">

            <section className="about-section">
                <h1>ABOUT VALENCIRÉ</h1>

                <p>
                    Founded with a vision to redefine modern luxury, VALENCIRÉ® stands at the
                    intersection of strength, elegance, and restraint. The House creates
                    essential silhouettes engineered for presence — not excess.
                </p>

                <p>
                    Each piece reflects a commitment to precision, fit, and craftsmanship,
                    designed to elevate form while remaining timeless. VALENCIRÉ® is built for
                    those who move with intent and wear confidence without announcement.
                </p>

                <p>
                    Rooted in discipline and refined through design, the brand continues to
                    shape a new language of luxury — one defined by control, clarity, and quiet
                    power.
                </p>
            </section>

            <div className="about-spacer"></div>

            <section className="about-help">
                <h2>MAY WE HELP YOU?</h2>

                <p>
                    Discover everything you need to know about the VALENCIRÉ universe with a
                    dedicated brand advisor.
                </p>

                <a href="#">Contact VALENCIRÉ Client Services</a>
            </section>

        </main>

        {/* ================= FOOTER ================= */}
        <footer className="about-footer">
            © 2025 VALENCIRÉ® — AIN’T FOR AVERAGE
        </footer>
      </div>
    </>
  );
}

About.getLayout = function getLayout(page) {
  return page;
};
