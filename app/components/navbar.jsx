import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

import { useSession, signOut, signIn } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          <Image src="/img/favicon.ico" width={50} height={50} alt="logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-white" aria-current="page" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" href="/facebook">
                Facebook
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" href="/google">
                Google
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" href="/cass">
                คอร์สเรียน
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" href="/tool">
                Tools
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" href="/admin">
                Admin
              </Link>
            </li>
          </ul>
          <span className="navbar-text">
            {session ? (
              <div className="d-flex align-items-center">
                <Image src="/img/user.webp" width={50} height={50} alt="user" />
                <button className="btn btn-danger ms-3" onClick={() => signOut()}>
                  Sign Out
                </button>
              </div>
            ) : (
              <button className="btn btn-info" onClick={() => signIn()}>
                Sign In
              </button>
            )}
          </span>
        </div>
      </div>
    </nav>
  );
}
