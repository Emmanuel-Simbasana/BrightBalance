<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCp9oJWPGwY1HAaLydznczUNvko8RlSIUE",
    authDomain: "simba-project-aca1b.firebaseapp.com",
    projectId: "simba-project-aca1b",
    storageBucket: "simba-project-aca1b.firebasestorage.app",
    messagingSenderId: "116424050517",
    appId: "1:116424050517:web:73a16459a459571f2691dc",
    measurementId: "G-MFXRRWY34M"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>