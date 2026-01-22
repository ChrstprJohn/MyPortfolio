import { Navbar, Welcome, Dock, Home } from '#components';
import { Draggable } from 'gsap/Draggable';
import gsap from 'gsap';
import { Finder, Resume, Safari, Terminal, Text, Image, Photos, Contact } from '#windows';
gsap.registerPlugin(Draggable);

const App = () => {
    return (
        <main>
            <Navbar />
            <Welcome />
            <Dock />
            <Home />

            <Terminal />
            <Safari />
            <Resume />
            <Finder />
            <Text />
            <Image />
            <Photos />
            <Contact />
        </main>
    );
};

export default App;
