import HeroSection from "../components/HeroSection";
import MainSection from "../components/MainSection";
import TestimonialSection from "../components/TestimonialSection";
import ContainerSection from "../components/ContainerSection";
import PriceSection from "../components/PriceSection";

// Map section types to their respective components
const SECTION_COMPONENTS = {
    HeroSection: HeroSection,
    MainSection: MainSection,
    TestimonialSection: TestimonialSection,
    ContainerSection: ContainerSection,
    PriceSection: PriceSection,
    // You can add more mappings here as needed
    // TextSection: TextSection,
    // ImageGallerySection: ImageGallerySection,
};

export default function SectionRenderer({ sections }) {
    if (!sections || sections.length === 0) {
        return null; // Return nothing if there are no sections
    }

    return (
        <>
            {sections.map((section, i) => {
                // Get the appropriate component based on the section type
                const SectionComponent = SECTION_COMPONENTS[section.__typename];

                if (!SectionComponent) {
                    // Fallback for unrecognized section types
                    console.warn(`No component found for section type: ${section.__typename}`);
                    return null;
                }

                // Render the component, passing the section and index as props
                return <SectionComponent key={i} section={section} i={i} />;
            })}
        </>
    );
}