import { WindowControls } from '#components';
import WindowWrapper from '#hoc/WindowWrapper';
import useWindowStore from '#store/window';
import React from 'react';

const Text = () => {
    const { windows } = useWindowStore();
    const { data } = windows.txtfile;

    // If no data, show empty state
    if (!data) {
        return (
            <>
                <div id='window-header'>
                    <WindowControls target={'txtfile'} />
                    <h2>Text File</h2>
                </div>

                <div className='bg-white p-6 h-full overflow-auto'>
                    <p className='text-gray-400 text-center mt-10'>No file selected</p>
                </div>
            </>
        );
    }

    return (
        <>
            <div id='window-header'>
                <WindowControls target={'txtfile'} />
                <h2>{data.name || 'Text File'}</h2>
            </div>

            <div className='bg-white p-6 h-full overflow-auto'>
                {/* Optional image */}
                {data.image && (
                    <div className='mb-6 flex justify-center'>
                        <img
                            src={data.image}
                            alt={data.name}
                            className='max-w-xs rounded-lg shadow-md'
                        />
                    </div>
                )}

                {/* Optional subtitle */}
                {data.subtitle && (
                    <h3 className='text-xl font-semibold mb-4 text-gray-800'>{data.subtitle}</h3>
                )}

                {/* Description paragraphs */}
                {data.description && Array.isArray(data.description) && (
                    <div className='space-y-4'>
                        {data.description.map((paragraph, index) => (
                            <p
                                key={index}
                                className='text-gray-700 leading-relaxed'
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

const TextWindow = WindowWrapper(Text, 'txtfile');

export default TextWindow;
