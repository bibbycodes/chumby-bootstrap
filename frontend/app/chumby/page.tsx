'use client';
import {signIn, useSession} from "next-auth/react";
import React, {useState} from "react";
import Select from 'react-select';
import useChumby from "@/app/hooks/useChumby";

export default function Chumby() {
  const {data, status} = useSession()
  const [animal, setAnimal] = useState<{value: string, label: string} | null>(null);
  const [color, setColor] = useState<{value: string, label: string} | null>(null);
  const [wear, setWear] = useState<{value: string, label: string}[] | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const {createChumby} = useChumby();

  const animalOptions = ['Cat', 'Dog', 'Koala', 'Bear', 'Panda', 'Demon', 'Husky'].map((animal) => ({value: animal, label: animal}));
  const colorOptions = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Black'].map((color) => ({value: color, label: color}));
  const wearOptions = ['Tuxedo', 'Glasses', 'Sunglasses', 'T-Shirt', 'Skirt'].map((wear) => ({
    value: wear,
    label: wear
  }));

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Do something with the form data (animal, color, wear)
    setSrc(await createChumby(animal!.value, [color!.value, ...wear!.map(v => v.value)]));
  };

  return <>
    <form onSubmit={handleSubmit} className="p-6 space-y-8">
      <div className="space-y-2">
        <label className="text-lg font-semibold">Choose an animal</label>
        <Select
          options={animalOptions}
          value={animal}
          onChange={setAnimal}
          className="text-black"
        />
      </div>

      <div className="space-y-2">
        <label className="text-lg font-semibold">Choose a color</label>
        <Select
          options={colorOptions}
          value={color}
          onChange={setColor}
          className="text-black"
        />
      </div>

      <div className="space-y-2">
        <label className="text-lg font-semibold">Choose what to wear (up to 3)</label>
        <Select
          options={wearOptions}
          value={wear}
          onChange={setWear}
          isMulti
          closeMenuOnSelect={false}
          className="text-black"
          maxMenuHeight={150}
        />
      </div>

      <button type="submit" className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Submit</button>
    </form>

    {src && <img src={src} alt="Chumby" className="w-1/2 mx-auto" />}
  </>
}
