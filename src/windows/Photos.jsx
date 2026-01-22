import { WindowControls } from '#components';
import { photosLinks, gallery } from '#constants';
import WindowWrapper from '#hoc/WindowWrapper';
import { Search, Upload, Heart, Share2, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

const Photos = () => {
    const [selectedCategory, setSelectedCategory] = useState('Library');

    // Get photos for the selected category
    const categoryPhotos = gallery[selectedCategory] || [];

    return (
        <>
            <div id='window-header'>
                <WindowControls target={'photos'} />

                <div className='flex items-center gap-3 ml-10'>
                    <Upload className='icon' />
                    <Heart className='icon' />
                    <Share2 className='icon' />
                    <Trash2 className='icon' />
                </div>

                <div className='flex-1 flex justify-end items-center gap-3 mr-5'>
                    <div className='search'>
                        <Search className='icon' />
                        <input
                            type='text'
                            placeholder='Search photos'
                            className='flex-1'
                        />
                    </div>
                </div>
            </div>

            <div className='bg-white flex h-full'>
                {/* Sidebar */}
                <div className='sidebar'>
                    <div>
                        <h3>Photos</h3>
                        <ul>
                            {photosLinks.map((item) => (
                                <li
                                    key={item.id}
                                    className={
                                        selectedCategory === item.title ? 'active' : 'not-active'
                                    }
                                    onClick={() => setSelectedCategory(item.title)}
                                >
                                    <img
                                        src={item.icon}
                                        className='w-4'
                                        alt={item.title}
                                    />
                                    <p className='text-sm font-medium truncate'>{item.title}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Gallery Grid */}
                <div className='flex-1 p-6 overflow-auto'>
                    <div className='mb-4'>
                        <h2 className='text-2xl font-bold text-gray-800'>{selectedCategory}</h2>
                        <p className='text-sm text-gray-500 mt-1'>{categoryPhotos.length} photos</p>
                    </div>

                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {categoryPhotos.map((item) => (
                            <div
                                key={item.id}
                                className='aspect-square overflow-hidden rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200 shadow-md hover:shadow-xl'
                            >
                                <img
                                    src={item.img}
                                    alt={item.title || `Gallery image ${item.id}`}
                                    className='w-full h-full object-cover'
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

const PhotosWindow = WindowWrapper(Photos, 'photos');

export default PhotosWindow;
