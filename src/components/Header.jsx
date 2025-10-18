import { Calculator } from 'lucide-react';

function Header() {
  return (
    <header className="h-[40px] px-4">
      <div className="flex w-full h-full items-center relative">
        <Calculator size={20} />
        <h3 className="ml-2 text-sm font-medium">Calculator</h3>
      </div>
    </header>
  );
}

export default Header;
