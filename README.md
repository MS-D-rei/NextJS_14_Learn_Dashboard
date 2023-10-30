## Next.js App Router Course - Memo 

This is my note for [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## Chapter 3

### 1. Why optimize font?
This is for Cumulative Layout Shift (CLS) problem
what is CLS? (Ref: https://web.dev/articles/cls)
CLS is a measure of the largest burst of layout shift scores for every unexpected layout shift that occurs during the entire lifespan of a page.

Layout shift score = impact fraction * distance fraction

impact fraction: indicates the impact unstable elements affect on the current user screen
distance fraction: indicates the distance the unstable elements moved from starting point

check the detailed example in the URL above.

### 2. Why optimize images?
We can use <img>. However, we have to manually do the following things.
- Ensure our image is responsive on screen sizes.
- Specify image sizes for different devices.
- Prevent layout shift when load image.
- Lazy load images that are outside the user's viewpoint.
NextJS Image resolves these issues.

## Chapter 4

How Routing and Navigation works
Ref: https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works

### 1. Prefetching
- <Link> components: automatically prefetch the page contents of the link.
Prefetching happens when the page first loads or it comes into view through scrolling.
<Link> for static routes => the entire route is prefetched and cached by default
<Link> for dynamic routes => fetch only shared layout until first loading.tsx is fetched and cached for 30s.
fetch all dynamic routes are not effective.
- router.prefetch(): useRouter hook

### 2. Caching
NextJS has an in-memory client-side cache called Router Cache.
As users navigate around the app, the prefetched payload of React Server Components and visited routes are stored in the cache.

### 3. Partial Rendering
Even if dashboard/xxx/page.tsx is re-rendered, the shared layout, dashboard/layout.tsx is not re-rendered.

### 4. Soft Navigation
NextJS uses Soft Navigation
Hard Navigation: reset React state, full page reload. reset browser scroll position, focused element.
Soft Navigation: only renders the segments which the state have changed. There is no full page reload.
remain scroll position, focus element by default.

### 5. Back and Forward Navigation
I think this is included in soft navigation explanation.

