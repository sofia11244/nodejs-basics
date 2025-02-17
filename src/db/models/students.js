// src/db/models/student.js

import { Schema, model } from 'mongoose';

const studentsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other'],
    },
    avgMark: {
      type: Number,
      required: true,
    },
    onDuty: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Exporting the model so it can be used elsewhere
// Öğrenci veri koleksiyonu "students" adını alacak ve her bir belgesi studentsSchema ile tanımlanan şemaya uygun olacaktır.
// StudentsCollection modeli, yeni bir öğrenciyi kaydetme, öğrenci listesini alma, öğrenci verilerini güncelleme gibi bu koleksiyonla çalışmak için bir dizi yöntem sunacaktır.
export const StudentsCollection = model('students', studentsSchema);

// İlk argümanı şemanın yapıcısına, her bir anahtarın belgede bir alana karşılık geldiği ve değerlerinin 
// bu alanları tanımlayan nesneler olduğu bir nesne olarak geçiriyoruz:

// type — bu alan için beklediğimiz veri tipini belirtir. Bizim durumumuzda bu String, Number ve Boolean'dır.

// required — bu özellik, alanın doldurulmasının zorunlu olup olmadığını belirtir. Eğer true olarak ayarlanmışsa, 
// alan her istekte gönderilmelidir.

// enum — alan için izin verilen değerlerin listesidir. 
// Bizim durumumuzda gender alanı için yalnızca "male", "female" veya "other" değerleri mümkündür.

// default — bu alan belirtilmediğinde varsayılan değeri belirtir.


// İkinci argüman olarak şemanın ek parametrelerini geçiriyoruz:

// timestamps — otomatik olarak createdAt ve updatedAt alanlarını oluşturmak için true değerini ayarlar; 
// bu alanlar belgenin oluşturulma ve güncellenme zamanını gösterir.

// versionKey — belgenin sürümlerini izlemek için __v alanının oluşturulup oluşturulmayacağını belirtir. 
// Bizim durumumuzda bu alanın oluşturulmaması için false olarak ayarlıyoruz.


const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const UsersCollection = model('users', usersSchema);
