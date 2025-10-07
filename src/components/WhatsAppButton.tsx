import { MessageCircle } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

const WhatsAppButton = () => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openWhatsApp();
  };

  return (
    <button
      onClick={handleClick}
      className="whatsapp-mobile bg-green-600 hover:bg-green-700 text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shadow-xl transition-transform hover:scale-110"
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
    </button>
  );
};

export default WhatsAppButton;
