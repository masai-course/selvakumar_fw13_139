// Problem no. 10
class Character {
  constructor(name, health, attackPower) {
    this.name = name;
    this.health = health;
    this.attackPower = attackPower;
  }

  attack(target) {
    target.health -= this.attackPower;
  }

  isAlive() {
    return this.health > 0;
  }
}
class Warrior extends Character {
  constructor(name, health, attackPower, weapon, armor) {
    super(name, health, attackPower);
    this.weapon = weapon;
    this.armor = armor;
  }

  attack(target) {
    if (this.weapon === "sword") {
      target.health -= this.attackPower + 10;
    } else {
      target.health -= this.attackPower;
    }
  }

  defend() {
    this.health += 10;
  }
}

// // Example Invocation
// const character1 = new Character("Enemy", 50, 15);
// const warrior1 = new Warrior("Hero", 100, 20, "sword", "plate armor");

// console.log(character1); //Character { name: 'Enemy', health: 50, attackPower: 15 }
// console.log(warrior1); // Warrior {name: 'Hero',health: 100,attackPower: 20,weapon: 'sword',armor: 'plate armor }

// // Warrior attacks character
// warrior1.attack(character1);
// console.log("Character after warrior's attack:");
// console.log(character1); //Character { name: 'Enemy', health: 20, attackPower: 15 }

// // Warrior defends
// warrior1.defend();
// console.log(warrior1); // Warrior {name: 'Hero',health: 110,attackPower: 30,weapon: 'sword',armor: 'plate armor'}

// // Check if character and warrior are alive
// console.log("Is character alive?", character1.isAlive()); // true
// console.log("Is warrior alive?", warrior1.isAlive()); // true

// Problem no. 11

// Generic Media class
class Media {
  #mediaType;

  constructor(mediaType) {
    this.mediaType = mediaType;
  }

  // Getter for mediaType
  get mediaType() {
    return this.#mediaType;
  }

  // Setter for mediaType
  set mediaType(value) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error("Media type must be a non-empty string.");
    }
    this.#mediaType = value;
  }
}

// Book class inheriting from Media
class Book extends Media {
    #title;
    #author;
    #publicationYear;
    #availableCopies;
  
    constructor(title, author, publicationYear, availableCopies) {
      super("Book");
      this.title = title;
      this.author = author;
      this.publicationYear = publicationYear;
      this.availableCopies = availableCopies;
    }
  
    get title() {
      return this.#title;
    }
  
    set title(value) {
      if (typeof value !== "string" || value.trim() === "") {
        throw new Error("Title must be a non-empty string.");
      }
      this.#title = value;
    }
  
    get author() {
      return this.#author;
    }
  
    set author(value) {
      if (typeof value !== "string" || value.trim() === "") {
        throw new Error("Author must be a non-empty string.");
      }
      this.#author = value;
    }
  
    get publicationYear() {
      return this.#publicationYear;
    }
  
    set publicationYear(value) {
      if (!Number.isInteger(value) || value <= 0) {
        throw new Error("Publication year must be a positive integer.");
      }
      this.#publicationYear = value;
    }
  
    get availableCopies() {
      return this.#availableCopies;
    }
  
    set availableCopies(value) {
      if (!Number.isInteger(value) || value < 0) {
        throw new Error("Available copies must be a non-negative integer.");
      }
      this.#availableCopies = value;
    }
  
    static comparePublicationYears(book1, book2) {
      if (book1.publicationYear < book2.publicationYear) {
        return -1;
      } else if (book1.publicationYear > book2.publicationYear) {
        return 1;
      } else {
        return 0;
      }
    }
}

// User class
class User {
  #firstName;
  #lastName;
  #borrowedBooks;

  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.#borrowedBooks = [];
  }

  get firstName() {
    return this.#firstName;
  }

  set firstName(value) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error("First name must be a non-empty string.");
    }
    this.#firstName = value;
  }

  get lastName() {
    return this.#lastName;
  }

  set lastName(value) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error("Last name must be a non-empty string.");
    }
    this.#lastName = value;
  }

  borrowBook(book) {
    if (!(book instanceof Book)) {
      throw new Error("Argument must be a Book instance.");
    }
    if (book.availableCopies <= 0) {
      throw new Error("No available copies of the book.");
    }
    this.#borrowedBooks.push(book);
    book.availableCopies--;
  }

  returnBook(book) {
    if (!(book instanceof Book)) {
      throw new Error("Argument must be a Book instance.");
    }
    const index = this.#borrowedBooks.indexOf(book);
    if (index === -1) {
      throw new Error("Book not borrowed by the user.");
    }
    this.#borrowedBooks.splice(index, 1);
    book.availableCopies++;
  }

  static fullName(user) {
    return `${user.firstName} ${user.lastName}`;
  }}

// Example usage
// const book1 = new Book("To Kill a Mockingbird", "Harper Lee", 1960, 5);
// const book2 = new Book("1984", "George Orwell", 1949, 10);

// const user1 = new User("Alice", "Smith");
// const user2 = new User("Bob", "Johnson");

// console.log("User 1 full name:", User.fullName(user1)); // Alice Smith

// user1.borrowBook(book1);
// console.log("Book1 availableCopies:", book1.availableCopies); // 4

// user1.borrowBook(book2);
// console.log("Book 2 availableCopies:", book2.availableCopies); // 9

// console.log(
//   "Comparing publication years:",
//   Book.comparePublicationYears(book1, book2)
// ); // 1

// user1.returnBook(book1);
// console.log("Book 1 availableCopies after return:", book1.availableCopies); // 5

//don't remove below export statement part
export { Character, Warrior, Media, Book, User };
