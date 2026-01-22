import { locations } from '#constants';
import useLocationStore from '#store/location';
import useWindowStore from '#store/window';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import React, { useRef } from 'react';

const Home = () => {
    const { openWindow } = useWindowStore();
    const { setActiveLocation } = useLocationStore();
    const homeRef = useRef(null);

    useGSAP(() => {
        const folders = homeRef.current?.querySelectorAll('.home-folder');
        if (!folders || folders.length === 0) return;

        const instances = [];

        folders.forEach((folder) => {
            const folderId = folder.dataset.folderId;
            const folderData = locations.work.children.find((f) => f.id === parseInt(folderId));

            const [instance] = Draggable.create(folder, {
                onClick: function () {
                    // This fires when clicked without dragging
                    if (folderData) {
                        setActiveLocation(folderData);
                        openWindow('finder');
                    }
                },
                onDragStart: function () {
                    gsap.to(this.target, {
                        scale: 1.05,
                        duration: 0.15,
                        ease: 'power2.out',
                    });
                },
                onDragEnd: function () {
                    gsap.to(this.target, {
                        scale: 1,
                        duration: 0.15,
                        ease: 'power2.out',
                    });
                },
            });
            instances.push(instance);
        });

        return () => {
            instances.forEach((instance) => instance.kill());
        };
    }, []);

    // Get project folders from WORK_LOCATION
    const projectFolders = locations.work.children || [];

    return (
        <div
            ref={homeRef}
            className='home-desktop'
        >
            {projectFolders.map((folder, index) => (
                <div
                    key={folder.id}
                    className={`home-folder ${folder.position || ''}`}
                    data-folder-id={folder.id}
                    style={{
                        position: 'absolute',
                        top: `${60 + index * 120}px`,
                        left: '50px',
                    }}
                >
                    <div className='folder-icon'>
                        <img
                            src={folder.icon}
                            alt={folder.name}
                            className='w-20 h-20 object-contain'
                            draggable={false}
                        />
                    </div>
                    <p className='folder-name text-white text-center mt-2 text-[0.8rem] font-normal px-1 py-0.5 rounded w-24 line-clamp-2 break-words leading-tight'>
                        {folder.name}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Home;
