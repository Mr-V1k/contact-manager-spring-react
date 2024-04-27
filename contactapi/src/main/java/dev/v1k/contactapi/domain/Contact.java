package dev.v1k.contactapi.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

class Address {
    String city;
    String country;
    public Address(String city, String country){
        this.city = city;
        this.country = country;
    }
}
enum Status{
    ACTIVE,INACTIVE
}
@Entity
@Table(name="contacts")
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class Contact {
    @Id
    @UuidGenerator
    @Column(name="id", unique = true, updatable = false)
    private String Id;
    private String photoUrl;
    private String name;
    private String occupation;
    private String email;
    private String address;
    private String phone;
    private String status;

    public Contact(String id, String photoUrl, String name, String occupation, String email, String address, String phone, String status) {
        this.Id = id;
        this.photoUrl = photoUrl;
        this.name = name;
        this.occupation = occupation;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.status = status;
    }

    public Contact() {
    }

    public String getId() {
        return Id;
    }

    public void setId(String id) {
        Id = id;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
