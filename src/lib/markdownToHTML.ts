import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function getPostData(contentPath: string) {
    try {
        const fullPath = path.join(process.cwd(), 'public', contentPath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    ...matterResult.data,
    contentHtml,
  };
    } catch (error) {
       console.error(error);
       return {
        contentHtml: null
       } 
    }
  
}
