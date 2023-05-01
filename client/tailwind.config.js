/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontSize: {
        'xss': '11px',
        'text': '12px',
        'xm': '14px',
        'xs': '16px',
        '1ls': '17.5px',
        '1l': '19px',
        '2l': '30px',
        '3l': '52px',
        '4l': '87px',
      },
      animation: {
        slideup: 'slideup 0.5s ease-in-out',
        slidedown: 'slidedown 0.5s ease-in-out',
        slideleft: 'slideleft 0.5s ease-in-out',
        slideright: 'slideright 0.5s ease-in-out forwards',
        scaleup: 'scaleup 2.5s ease-in-out forwards',
        rotateShake: 'rotateShake 2s ease-in-out forwards',
        bellShake: 'bellShake 2s ease-in-out infinite',
        spinn: 'spinn 10s linear infinite',
      },
      borderRadius: {
        'modal': '0px 30px 0px 0px',
        'alert': '13px 13px 0px 13px',
      },
      backgroundImage: {
        'right-bg': 'radial-gradient(50% 98.88% at 50% 50%, #FFFCFC 0%, #EAECED 100%)',
        'main': 'radial-gradient(50% 98.88% at 50% 50%, #ECEEF0 0%, #FFFCFC 33.33%)'
      },
      screens: {
        'nav': '1471px',
        // Home page screens
        'homebreak': '1171px',
        'recommendbreak': '570px',
        'homemobbreak': '471px',
        // Top Nav screens
        'topnavbreak': '940px',
        // Login page screens
        'loginbreak': '1177px',
        'loginbtnbreak':'505px',
        // Profile page screens
        'profilebreak': '1612px',
        'saved': '996px',
        'scroll': '850px',
        // Product page screens
        'productbreak':'974px',
        'productimgbreak': '503px',
        // History page screens
        'history':'648px',
        'td': '609px',
        // Explore break
        'category':'604px',
        'categories': '374px',
        'images': '1123px',
        'filters': '903px',
        'recom': '1011px',
        // Search page screens
        'searchbreak':'936px',
        'productsbreak':'820px',
      },
      boxShadow: {
        'login': '0px 4px 4px rgba(0, 0, 0, 0.25);',
        'general': '0px 0px 16px 1px rgba(0, 0, 0, 0.25);',
        'all': '0px 4px 4px 3px rgba(0, 0, 0, 0.2);',
      },
      dropShadow: {
        'text': '0.5px 0.5px 0px #000000;',
      },
      keyframes: {
        slowfade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        spinn: {
          '100%': {transform: 'rotate(360deg)'}
        },
        slideup: {
          from: { opacity: 0, transform: 'translateY(25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slidedown: {
          from: { opacity: 0, transform: 'translateY(-25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slideleft: {
          from: { opacity: 0, transform: 'translateX(-20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideright: {
          from: { opacity: 0, transform: 'translateX(20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        shake: {
          '0%': {transform: 'translateX(-10px)'},
          '50%': {transform: 'translateX(10px)'},
          '100%': {transform: 'translateX(0px)'},
        },
        wave: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        myOrbit: {
          '0%': { transform: 'rotate(0deg) translateX(0) translateY(0px)' },
          '50%': {transform: 'rotate(5deg) translateX(-0px) translateY(-40px)'},
          '100%':   { transform: 'rotate(0deg) translateX(0) translateY(-0px)' }
        },
        scaleup: {
          '0%': {transform:'scale-[0.4]',
                 opacity:0},
          '100%': {transform:'scale-[1]',
                 opacity:1},
        },
        gradopp: {
          '0%': {background: 'linear-gradient(90deg, #DAED00 100%, #FFC300 0%)'},
          '100%': {background: 'linear-gradient(90deg, #FFC300 0%, #FFFFFF 100%)'},
        },
        rotateShake: {
          '0%': {transform: 'translateX(-15px) rotate(2deg) scale(0.4)'},
          '50%': {transform: 'translateX(-15px) rotate(-2deg) scale(1.2)'},
          '100%': {transform: 'translateX(0px) rotate(-4deg) scale(1)'},
        },
        navDown: {
          '0%': {transform:'translateY(-295.35px)',opacity:0},
          '100%':{transform:'translateY(0px)',opacity:1},
        },
        bellShake: {
          '0%': { transform: 'rotate(0);' },
          '15%': { transform: 'rotate(5deg);' },
          '30%': { transform: 'rotate(-5deg);' },
          '45%': { transform: 'rotate(4deg);' },
          '60%': { transform: 'rotate(-4deg) scale(1.05)' },
          '75%': { transform: 'rotate(2deg);' },
          '85%': { transform: 'rotate(-2deg);' },
          '92%': { transform: 'rotate(1deg);' },
          '100%': { transform: 'rotate(0);' },
        }
      },
    },
    variants: {
      extend: {
        fontWeight: ["responsive", "hover", "focus"],
        opacity: ["hover"],
        borderColor: ["hover", "focus"],
        margin: ["first", "last"],
        backgroundColor: ["odd", "even"],
        scale: ["hover", "active", "group-hover"],
      },
    },
  },
  plugins: [],
}