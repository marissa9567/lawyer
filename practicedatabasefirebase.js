rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Rules for products collection
    match /products/{productId} {
      allow read: if true; // Allow public read access to the products
      allow write: if request.auth != null; // Allow writes only for authenticated users
    }
    
    // Rules for posts collection
    match /posts/{post} {
      allow read: if true; // Allow anyone to read posts
      allow write: if request.auth != null; // Allow only authenticated users to write
    }

    // Rules for images collection
    match /images/{userId} {
      allow read: if request.auth != null; // Allow read access for authenticated users
      allow write: if request.auth != null; // Allow write access for authenticated users
      allow delete: if request.auth != null; // Allow delete for authenticated users
    }
  }
}
