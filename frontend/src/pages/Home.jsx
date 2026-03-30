import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <section className="vh-100 bg-light d-flex align-items-center justify-content-center">
            <div className="text-center">
                <h1 className="display-4 mb-4">Welcome to Job Portal</h1>
                <p className="lead mb-4">Find your dream job today</p>
                <button className='btn btn-primary'><Link className='nav-link' to="/jobs">View Jobs</Link></button>
            </div>
        </section>
    )
}
