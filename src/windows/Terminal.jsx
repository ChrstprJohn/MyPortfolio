import { WindowControls } from '#components';
import { techStack } from '#constants';
import WindowWrapper from '#hoc/WindowWrapper';
import { Check } from 'lucide-react';
import React from 'react';

const Terminal = () => {
    return (
        <>
            <div id='window-header'>
                <WindowControls target={'terminal'} />
                <h2>Tech Stack</h2>
            </div>

            <div className='techstack'>
                <p>
                    <span className='font-bold'>show tech stack</span>
                </p>

                <div className='label'>
                    <p className='w-32'>Category</p>
                    <p>Technologies</p>
                </div>

                <ul className='content'>
                    {techStack.map(({ category, items }) => (
                        <li
                            className='flex'
                            key={category}
                        >
                            <Check
                                className='check'
                                size={20}
                            />
                            <h3>{category}</h3>
                            <ul>
                                {items.map((item, index) => (
                                    <li key={index}>
                                        {item}
                                        {index < items.length - 1 ? ',' : ''}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>

                <div className='footnote'>
                    <p>
                        <Check size={20} /> 5 of 5 stacks loaded successfull(100%)
                    </p>
                </div>
            </div>
        </>
    );
};

const TerminalWindow = WindowWrapper(Terminal, 'terminal');

export default TerminalWindow;
