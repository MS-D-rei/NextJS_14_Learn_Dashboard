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
