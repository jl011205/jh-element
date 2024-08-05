import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  // srcDir:'components',
    markdown: {
        config(md) {
         md.use(containerPreview)
          md.use(componentPreview)
        }},
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'test', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'test Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text:'Basic',
        items:[
          {text:'Button', link:'/components/button'},
          {text:'Input',link:'/components/input'},
          {text:'Switch',link:'/components/switch'},
          {text:'Form',link:'/components/form'},
          {text:'Select',link:'/components/select'}
        ]
      }  
    ],
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },

})
