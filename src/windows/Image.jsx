import { WindowControls } from '#components';
import WindowWrapper from '#hoc/WindowWrapper';
import useWindowStore from '#store/window';
import React from 'react';

const Image = () => {
    const { windows } = useWindowStore();
    const { data } = windows.imgfile;

    // If no data, show empty state
    if (!data) {
        return (
            <>
                <div id='window-header'>
                    <WindowControls target={'imgfile'} />
                    <h2>Image Viewer</h2>
                </div>

                <div className='bg-white p-6 h-full overflow-auto flex items-center justify-center'>
                    <p className='text-gray-400 text-center'>No image selected</p>
                </div>
            </>
        );
    }

    return (
        <>
            <div id='window-header'>
                <WindowControls target={'imgfile'} />
                <h2>{data.name || 'Image Viewer'}</h2>
            </div>

            <div className='bg-white p-6 h-full overflow-auto flex flex-col items-center justify-center'>
                {/* Main image */}
                {data.imageUrl && (
                    <div className='w-full h-full flex items-center justify-center'>
                        <img
                            src={data.imageUrl}
                            alt={data.name}
                            className='max-w-full max-h-full object-contain rounded-lg shadow-lg'
                        />
                    </div>
                )}

                {/* Fallback if no imageUrl */}
                {!data.imageUrl && <p className='text-gray-400'>Image not found</p>}
            </div>
        </>
    );
};

const ImageWindow = WindowWrapper(Image, 'imgfile');

export default ImageWindow;
