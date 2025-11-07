package com.foodandhunger.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="recipients")
public class RecipientModel {
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Setter
    @Getter
    private int userId;
    @Setter
    @Getter
    private String name;
    @Setter
    @Getter
    private int age;
    @Setter
    @Getter
    private String address;
    @Setter
    @Getter
    private String organizationName;
    @Setter
    @Getter
    private String pan;
    @Setter
    @Getter
    private String aadhaar;
    @Setter
    @Getter
    private String phone;
    @Setter
    @Getter
    private String email;
    @Setter
    @Getter
    private String organization_certificate_id;

    // Store binary data for images or certificates
    @Getter
    @Setter
    private byte[] organizationCertificate;
    @Getter
    @Setter
    private byte[] photo;
    @Getter
    @Setter
    private byte[] signature;

    public RecipientModel(){}
    public RecipientModel(int userId, String name, int age, String address, String organizationName, String pan, String aadhaar, String phone, String email, String organization_certificate_id ){
        this.userId=userId;
        this.name = name;
        this.age =age ;
        this.address =address ;
        this.organizationName =organizationName ;
        this.pan =pan ;
        this.aadhaar =aadhaar ;
        this.phone =phone ;
        this.email =email ;
        this.organization_certificate_id =organization_certificate_id ;
    }

}
