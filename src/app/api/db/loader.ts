"use client"

import path from 'node:path'
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { JSONLoader } from "langchain/document_loaders/fs/json";


const loader = new DirectoryLoader(
    path.resolve(__dirname, '../tmp'),
    {
        '.json': path => new JSONLoader(path, '/chapters')
    }
)

async function load() {
    const docs = await loader.load()
    console.log(docs)
}
load()