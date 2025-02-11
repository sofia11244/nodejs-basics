// src/utils/env.js

import dotenv from 'dotenv';

dotenv.config();

export function env(name, defaultValue) {
  const value = process.env[name];

  if (value) return value;

  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.env['${name}'].`);
}

// Çevresel değişkenin mevcut olmama olasılığını göz önünde bulundurarak, varlığını kontrol edecek ve
// değişken ayarlanmamışsa hata üretecek bir yardımcı fonksiyon oluşturmak faydalı olacaktır.
// Bu nedenle, utils klasöründe env.js adında bir dosya oluşturarak dotenv'in başlatılmasını buraya
// taşıyacağız. Bu dosyada, çevresel değişkenleri okumak için tasarlanmış env fonksiyonunu tanımlayacağız.

// Onu şu şekilde kullanabiliriz: env('PORT', '3000');
// Eğer bu isimde bir ortam değişkeni belirtilmemişse ve varsayılan bir değer de verilmemişse,
// bu fonksiyonun çağrılması Missing: process.env['PORT'] mesajıyla bir hata fırlatır.
