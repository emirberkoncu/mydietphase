import React, { useState } from 'react';

const App = () => {
  const [bmi, setBmi] = useState(null);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const [calories, setCalories] = useState(null);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('moderate');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const calculateBMI = () => {
    if (height && weight) {
      const bmiValue = (weight / (height / 100) ** 2).toFixed(1);
      setBmi(parseFloat(bmiValue));
    }
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'Zayıf', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Fazla Kilolu', color: 'text-yellow-600' };
    return { category: 'Obez', color: 'text-red-600' };
  };

  const getBMIMessage = (bmi) => {
    if (bmi < 18.5)
      return 'Sağlıklı bir kiloya ulaşmak için beslenmenizi geliştirmeyi düşünün.';
    if (bmi < 25) return 'Harika! Sağlıklı kilonuzu korumaya devam edin.';
    if (bmi < 30)
      return 'Sağlıklı beslenme ve düzenli egzersizle ideal kilonuza ulaşabilirsiniz.';
    return 'Sağlığınız için bir doktora danışarak kilo vermeyi hedefleyin.';
  };

  const calculateCalories = () => {
    if (weight && height && age) {
      let bmr;
      if (gender === 'male') {
        bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
      } else {
        bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
      }

      let activityMultiplier;
      switch (activityLevel) {
        case 'sedentary':
          activityMultiplier = 1.2;
          break;
        case 'light':
          activityMultiplier = 1.375;
          break;
        case 'moderate':
          activityMultiplier = 1.55;
          break;
        case 'active':
          activityMultiplier = 1.725;
          break;
        case 'veryActive':
          activityMultiplier = 1.9;
          break;
        default:
          activityMultiplier = 1.55;
      }

      const totalCalories = Math.round(bmr * activityMultiplier);
      setCalories(totalCalories);
    }
  };

  const calculateMacros = (calories) => {
    const protein = Math.round((calories * 0.3) / 4); // 30% protein
    const carbs = Math.round((calories * 0.4) / 4); // 40% carbs
    const fats = Math.round((calories * 0.3) / 9); // 30% fats

    return { protein, carbs, fats };
  };

  const motivationalQuotes = [
    'Sağlıklı beslenme bir diyet değil, yaşam tarzıdır.',
    'Vücudunuz bir tapınaktır, ona öyle davranın.',
    'Her öğün bir seçimdir. Akıllıca seçin.',
    'Kilo vermek zor olabilir, ama pişman olmak daha zordur.',
    'Sağlıklı yemek yemek, kendinize verdiğiniz bir hediyedir.',
  ];

  const randomQuote =
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });
    // Clear form fields after submission
    setName('');
    setEmail('');
    setMessage('');
    alert('Mesajınız gönderildi! Teşekkür ederiz.');
  };

  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-green-600 text-white p-4">
        <h1 className="text-3xl font-bold">myDietPhase @emirberkoncu</h1>
      </header>

      <main className="container mx-auto p-4">
        <section className="mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <p className="text-xl text-center text-green-700 italic font-semibold">
              "{randomQuote}"
            </p>
          </div>
          <h2 className="text-2xl font-semibold mb-4">
            Sağlık Hesaplayıcıları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* BMI Hesaplayıcı Kartı */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">BMI Hesaplayıcı</h3>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Boy (cm)"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Kilo (kg)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full border p-2 rounded"
                />
                <button
                  onClick={calculateBMI}
                  className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                  BMI Hesapla
                </button>
              </div>
              {bmi && (
                <div className="mt-4 p-3 bg-gray-100 rounded">
                  <p className="font-semibold">BMI: {bmi}</p>
                  <p className={`font-bold ${getBMICategory(bmi).color}`}>
                    Kategori: {getBMICategory(bmi).category}
                  </p>
                  <p className="mt-2">{getBMIMessage(bmi)}</p>
                </div>
              )}
            </div>

            {/* Kalori Hesaplayıcı Kartı */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">
                Kalori ve Makro Besin Hesaplayıcı
              </h3>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Boy (cm)"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Kilo (kg)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Yaş"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full border p-2 rounded"
                />
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="male">Erkek</option>
                  <option value="female">Kadın</option>
                </select>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="sedentary">Hareketsiz</option>
                  <option value="light">Az Hareketli</option>
                  <option value="moderate">Orta Derece Hareketli</option>
                  <option value="active">Çok Hareketli</option>
                  <option value="veryActive">Aşırı Hareketli</option>
                </select>
                <button
                  onClick={calculateCalories}
                  className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                  Kalori Hesapla
                </button>
              </div>
              {calories && (
                <div className="mt-4 p-3 bg-gray-100 rounded">
                  <p className="font-semibold">
                    Günlük Kalori İhtiyacı: {calories} kcal
                  </p>
                  <p className="font-bold mt-2">Makro Besin Değerleri:</p>
                  <ul className="list-disc list-inside">
                    <li>{calculateMacros(calories).protein}g protein</li>
                    <li>{calculateMacros(calories).carbs}g karbonhidrat</li>
                    <li>{calculateMacros(calories).fats}g yağ</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">İletişim</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ad Soyad
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mesaj
                </label>
                <textarea
                  id="message"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Gönder
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-green-600 text-white p-4 mt-8">
        <p>&copy; 2024 myDietPhase @emirberkoncu. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
};

export default App;
