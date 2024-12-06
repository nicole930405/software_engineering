package org.example.compositeKey;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.*;

@Embeddable
public class ordermealKey implements Serializable {
    @Column(name = "order_id")
    private int order_id;

    @Column(name = "meal_id")
    private int meal_id;

    public ordermealKey() {}
    public ordermealKey(int order_id, int meal_id) {
        this.order_id = order_id;
        this.meal_id = meal_id;
    }
    public int getOrder_id() {return order_id;}
    public void setOrder_id(int order_id) {this.order_id = order_id;}
    public int getMeal_id() {return meal_id;}
    public void setMeal_id(int meal_id) {this.meal_id = meal_id;}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ordermealKey that = (ordermealKey) o;
        return order_id == that.order_id && meal_id == that.meal_id;
    }

    @Override
    public int hashCode() {return Objects.hash(order_id, meal_id);}

}
