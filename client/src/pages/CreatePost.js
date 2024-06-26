import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        console.log('Form Data:', Object.fromEntries(data.entries())); // Log form data
        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        });

        // Log response
        console.log('Response:', response);

        if (response.ok) {
            setRedirect(true);
        } else {
            console.error('Failed to create post:', response.status, response.statusText);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />;
    }

    return (
        <form onSubmit={createNewPost}>
            <input
                type="title"
                placeholder={'Title'}
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
            />
            <input
                type="summary"
                placeholder={'Summary'}
                value={summary}
                onChange={(ev) => setSummary(ev.target.value)}
            />
            <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
            <ReactQuill value={content} onChange={setContent} />

            <button style={{ marginTop: '5px' }}>Create post</button>
        </form>
    );
}

