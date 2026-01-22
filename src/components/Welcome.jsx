import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

const FONT_WEIGHT = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span
            key={i}
            className={className}
            style={{
                display: 'inline-block',
                fontVariationSettings: `'wght' ${baseWeight}`,
            }}
        >
            {char === ' ' ? '\u00A0' : char}
        </span>
    ));
};

const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

const textHover = (container, type) => {
    if (!container) return;

    const letters = container.querySelectorAll('span');
    const { min, max, default: base } = FONT_WEIGHT[type];

    const animateLetter = (letter, weight, duration = 0.25) => {
        return gsap.to(letter, {
            duration,
            'ease': 'power2.out',
            '--wght': weight,
            'onUpdate': () => {
                const val = gsap.getProperty(letter, '--wght');
                letter.style.fontVariationSettings = `'wght' ${val}`;
            },
            'overwrite': true,
        });
    };

    const handleMouseMove = (e) => {
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;

        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            const distance = Math.abs(mouseX - (l - left + w / 2));
            const intensity = Math.exp(-(distance ** 2) / 20000);

            const weight = min + (max - min) * intensity;
            animateLetter(letter, weight);
        });
    };

    const throttledMouseMove = throttle(handleMouseMove, 16);

    const handleMouseLeave = () => {
        letters.forEach((letter) => animateLetter(letter, base, 0.3));
    };

    container.addEventListener('mousemove', throttledMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
        container.removeEventListener('mousemove', throttledMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
    };
};

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useGSAP(() => {
        const cleanupSubtitle = textHover(subtitleRef.current, 'subtitle');
        const cleanupTitle = textHover(titleRef.current, 'title');

        return () => {
            cleanupSubtitle?.();
            cleanupTitle?.();
        };
    }, []);

    return (
        <section id='welcome'>
            <p ref={subtitleRef}>
                {renderText("Hey, I'm Christopher! Welcome to my", 'text-3xl font-georama', 100)}
            </p>
            <h1
                ref={titleRef}
                className='mt-7'
            >
                {renderText('portfolio', 'text-9xl italic font-georama', 400)}
            </h1>

            <div className='small-screen'>
                <p>This portfolio is designed for desktop/tablet screens only</p>
            </div>
        </section>
    );
};

export default Welcome;
