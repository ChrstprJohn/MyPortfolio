import { WindowControls } from '#components';
import { socials } from '#constants';
import WindowWrapper from '#hoc/WindowWrapper';
import { Mail, Phone, MapPin, Send, ExternalLink } from 'lucide-react';
import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
        alert('Message sent! (Demo mode)');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <>
            <div id='window-header'>
                <WindowControls target={'contact'} />
                <h2>Get In Touch</h2>
            </div>

            <div className='bg-linear-to-br from-white to-gray-50 h-full overflow-auto'>
                <div className='max-w-6xl mx-auto p-8'>
                    {/* Header Section */}
                    <div className='text-center mb-10'>
                        <h1 className='text-4xl font-bold text-gray-800 mb-3'>Contact Me</h1>
                        <p className='text-gray-600 text-lg'>
                            Let's build something amazing together!
                        </p>
                    </div>

                    <div className='grid md:grid-cols-2 gap-8'>
                        {/* Contact Info & Social Links */}
                        <div className='space-y-6'>
                            {/* Contact Details */}
                            <div className='bg-white rounded-xl shadow-lg p-6'>
                                <h3 className='text-2xl font-bold text-gray-800 mb-4'>
                                    Contact Information
                                </h3>

                                <div className='space-y-4'>
                                    <div className='flex items-center gap-3 text-gray-700'>
                                        <Mail
                                            className='text-blue-500'
                                            size={20}
                                        />
                                        <span>adrian@example.com</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-gray-700'>
                                        <Phone
                                            className='text-green-500'
                                            size={20}
                                        />
                                        <span>+1 (555) 123-4567</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-gray-700'>
                                        <MapPin
                                            className='text-red-500'
                                            size={20}
                                        />
                                        <span>San Francisco, CA</span>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media Links */}
                            <div className='bg-white rounded-xl shadow-lg p-6'>
                                <h3 className='text-2xl font-bold text-gray-800 mb-4'>
                                    Connect With Me
                                </h3>

                                <div className='grid grid-cols-2 gap-4'>
                                    {socials.map((social) => (
                                        <a
                                            key={social.id}
                                            href={social.link}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='flex items-center gap-3 p-4 rounded-lg hover:scale-105 transition-transform duration-200 cursor-pointer shadow-md hover:shadow-xl'
                                            style={{ backgroundColor: social.bg }}
                                        >
                                            <img
                                                src={social.icon}
                                                alt={social.text}
                                                className='w-6 h-6 filter invert'
                                            />
                                            <div className='flex-1'>
                                                <p className='text-white font-semibold text-sm'>
                                                    {social.text}
                                                </p>
                                            </div>
                                            <ExternalLink
                                                className='text-white'
                                                size={16}
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className='bg-white rounded-xl shadow-lg p-6'>
                            <h3 className='text-2xl font-bold text-gray-800 mb-4'>
                                Send a Message
                            </h3>

                            <form
                                onSubmit={handleSubmit}
                                className='space-y-4'
                            >
                                <div>
                                    <label
                                        htmlFor='name'
                                        className='block text-sm font-medium text-gray-700 mb-2'
                                    >
                                        Your Name
                                    </label>
                                    <input
                                        type='text'
                                        id='name'
                                        name='name'
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
                                        placeholder='John Doe'
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm font-medium text-gray-700 mb-2'
                                    >
                                        Your Email
                                    </label>
                                    <input
                                        type='email'
                                        id='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
                                        placeholder='john@example.com'
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='message'
                                        className='block text-sm font-medium text-gray-700 mb-2'
                                    >
                                        Your Message
                                    </label>
                                    <textarea
                                        id='message'
                                        name='message'
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={6}
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none'
                                        placeholder='Tell me about your project...'
                                    />
                                </div>

                                <button
                                    type='submit'
                                    className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg'
                                >
                                    <Send size={20} />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Availability Status */}
                    <div className='mt-8 bg-white rounded-xl shadow-lg p-6 text-center'>
                        <div className='flex items-center justify-center gap-3'>
                            <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
                            <p className='text-gray-700 font-medium'>
                                Available for freelance projects
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const ContactWindow = WindowWrapper(Contact, 'contact');

export default ContactWindow;
