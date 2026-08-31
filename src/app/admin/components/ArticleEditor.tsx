'use client';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';

export function SubmitButtons() {
  const { pending } = useFormStatus();
  return (
    <div className="flex gap-3">
      <button
        type="submit"
        name="status"
        value="draft"
        disabled={pending}
        className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
      >
        Save as Draft
      </button>
      <button
        type="submit"
        name="status"
        value="published"
        disabled={pending}
        className="px-6 py-2.5 bg-blue-600 border border-transparent text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
      >
        {pending ? (
          <span className="w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full animate-spin mr-2"></span>
        ) : null}
        Publish
      </button>
    </div>
  );
}

// Ignore types for react-quill since @types/react-quill was missing
// @ts-ignore
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function ArticleEditor({ 
  article, 
  formAction, 
  state 
}: { 
  article?: any, 
  formAction: (payload: FormData) => void, 
  state: any 
}) {
  const [activeTab, setActiveTab] = useState<'en' | 'id'>('en');
  const [contentEn, setContentEn] = useState(article?.content_en || '');
  const [contentId, setContentId] = useState(article?.content_id || '');
  const [imagePreview, setImagePreview] = useState<string | null>(article?.image || null);
  const [seoExpanded, setSeoExpanded] = useState(false);
  const [titleEn, setTitleEn] = useState(article?.title_en || '');

  const slugPreview = titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ]
  };

  return (
    <form action={formAction} className="p-6 w-full flex flex-col lg:flex-row gap-6">
      {article && <input type="hidden" name="id" value={article.id} />}
      
      {/* Main Content Column */}
      <div className="flex-1 space-y-6">
        <header className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{article ? 'Edit Article' : 'New Article'}</h1>
          </div>
          <div className="hidden lg:block">
            <SubmitButtons />
          </div>
        </header>

        {state?.error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100">
            {state.error}
          </div>
        )}

        <div className="bg-white p-1 rounded-lg border border-gray-200 inline-flex">
          <button type="button" onClick={() => setActiveTab('en')} className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'en' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}>English</button>
          <button type="button" onClick={() => setActiveTab('id')} className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'id' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}>Indonesia</button>
        </div>

        {/* English Tab */}
        <div className={`space-y-6 ${activeTab !== 'en' ? 'hidden' : ''}`}>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Title (EN) *</label>
            <input type="text" name="title_en" value={titleEn} onChange={e => setTitleEn(e.target.value)} required className="w-full bg-white border border-gray-300 text-gray-900 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" />
            <p className="text-xs text-gray-500 mt-1">Slug: /articles/{slugPreview || '...'}</p>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Content (EN) *</label>
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-200 [&_.ql-toolbar]:bg-gray-50 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[300px]">
              <ReactQuill theme="snow" value={contentEn} onChange={setContentEn} modules={quillModules} />
            </div>
            <input type="hidden" name="content_en" value={contentEn} />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Excerpt (EN)</label>
            <textarea name="excerpt_en" defaultValue={article?.excerpt_en || ''} rows={3} className="w-full bg-white border border-gray-300 text-gray-900 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"></textarea>
          </div>
        </div>

        {/* Indonesia Tab */}
        <div className={`space-y-6 ${activeTab !== 'id' ? 'hidden' : ''}`}>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Title (ID) *</label>
            <input type="text" name="title_id" defaultValue={article?.title_id || ''} required className="w-full bg-white border border-gray-300 text-gray-900 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Content (ID) *</label>
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-200 [&_.ql-toolbar]:bg-gray-50 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[300px]">
              <ReactQuill theme="snow" value={contentId} onChange={setContentId} modules={quillModules} />
            </div>
            <input type="hidden" name="content_id" value={contentId} />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Excerpt (ID)</label>
            <textarea name="excerpt_id" defaultValue={article?.excerpt_id || ''} rows={3} className="w-full bg-white border border-gray-300 text-gray-900 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"></textarea>
          </div>
        </div>
      </div>

      {/* Sidebar Column */}
      <div className="w-full lg:w-80 space-y-6 lg:pt-16">
        
        {/* Thumbnail Card */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-900">Thumbnail</h3>
          
          <div className="w-full aspect-video bg-gray-100 rounded-lg border border-gray-200 overflow-hidden flex flex-col items-center justify-center relative group">
            {imagePreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400 text-sm">No image</span>
            )}
            
            {/* Overlay that shows on hover */}
            <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${imagePreview ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
              <span className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:bg-gray-50 pointer-events-none">
                {imagePreview ? 'Ganti Gambar' : 'Upload Image'}
              </span>
            </div>
            
            {/* The actual invisible file input covering the whole area */}
            <input 
              type="file" 
              name="image" 
              accept="image/*" 
              onChange={handleImageChange} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              required={!article} 
            />
          </div>
        </div>

        {/* SEO Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <button 
            type="button" 
            onClick={() => setSeoExpanded(!seoExpanded)}
            className="w-full px-5 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <h3 className="font-semibold text-gray-900">SEO Settings</h3>
            <svg className={`w-5 h-5 text-gray-500 transform transition-transform ${seoExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {seoExpanded && (
            <div className="p-5 space-y-4 border-t border-gray-200">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Meta Title (EN)</label>
                <input type="text" name="metaTitle_en" defaultValue={article?.metaTitle_en || ''} className="w-full bg-white border border-gray-300 text-gray-900 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Meta Description (EN)</label>
                <textarea name="metaDescription_en" defaultValue={article?.metaDescription_en || ''} rows={2} className="w-full bg-white border border-gray-300 text-gray-900 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"></textarea>
              </div>
              <hr className="border-gray-100" />
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Meta Title (ID)</label>
                <input type="text" name="metaTitle_id" defaultValue={article?.metaTitle_id || ''} className="w-full bg-white border border-gray-300 text-gray-900 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Meta Description (ID)</label>
                <textarea name="metaDescription_id" defaultValue={article?.metaDescription_id || ''} rows={2} className="w-full bg-white border border-gray-300 text-gray-900 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"></textarea>
              </div>
              <hr className="border-gray-100" />
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Focus Keyword</label>
                <input type="text" name="focusKeyword" defaultValue={article?.focusKeyword || ''} className="w-full bg-white border border-gray-300 text-gray-900 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm" />
              </div>
            </div>
          )}
        </div>

        <div className="lg:hidden">
          <SubmitButtons />
        </div>
      </div>
    </form>
  );
}
