package org.example.compositeKey;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.*;

@Embeddable
public class storemealKey implements Serializable {
    @Column(name = "store_id")
    private int store_id;

    @Column(name = "meal_id")
    private int meal_id;

    public storemealKey(){}
    public storemealKey(int store_id, int meal_id){
        this.store_id = store_id;
        this.meal_id = meal_id;
    }

    public int getStore_id() {
        return store_id;
    }
    public void setStore_id(int store_id) {
        this.store_id = store_id;
    }
    public int getMeal_id() {
        return meal_id;
    }
    public void setMeal_id(int meal_id) {
        this.meal_id = meal_id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        storemealKey that = (storemealKey) o;
        return store_id == that.store_id && meal_id == that.meal_id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(store_id, meal_id);
    }


}
