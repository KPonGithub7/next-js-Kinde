import { createPost } from '@/actions/actions'
import React from 'react'

const Form = () => {
  return (
<form
                action={createPost}
                className="flex flex-col max-w-md mx-auto gap-2 my-10"
            >
                <input
                    type="text"
                    name="title"
                    placeholder="Title for the new post..."
                    className="border rounded px-3 py-2 h-full"
                />
                <textarea
                    name="body"
                    id="body"
                    className="border py-2 px-3"
                    placeholder="Body of the blog post... "
                    rows={6}
                ></textarea>
                <button className="h-10 bg-blue-500 px-5 rounded text-white">
                    Submit
                </button>
            </form>  )
}

export default Form